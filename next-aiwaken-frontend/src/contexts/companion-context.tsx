"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback
} from 'react'
import {
  useGetHint,
  useGetMotivation,
  useGetTips
} from '@/(features)/companion-action'
import { TokenStorage } from '@/lib/token-storage'

export interface ICompanionContextType {
  showMotivation: boolean
  showHint: boolean
  showTips: boolean
  motivationText: string
  hintText: string
  tipsText: string
  handleShowMotivation: () => Promise<void>
  handleShowHint: (params: { quiz_question: string; topic_title: string }) => Promise<void>
  handleShowTips: (params: CompanionTipsParams) => Promise<void>
  closeMotivation: () => void
  closeHint: () => void
  closeTips: () => void
  isHintLoading: boolean
  isMotivationLoading: boolean
  isTipsLoading: boolean
}

export const CompanionContext = createContext<ICompanionContextType>({
  showMotivation: false,
  showHint: false,
  showTips: false,
  motivationText: '',
  hintText: '',
  tipsText: '',
  handleShowMotivation: async () => { },
  handleShowHint: async () => { },
  handleShowTips: async () => { },
  closeMotivation: () => { },
  closeHint: () => { },
  closeTips: () => { },
  isHintLoading: false,
  isMotivationLoading: false,
  isTipsLoading: false,
})

export const CompanionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { getHintAsync, isPending: isHintLoading } = useGetHint()
  const { getMotivationAsync, isPending: isMotivationLoading } = useGetMotivation()
  const { getTipsAsync, isPending: isTipsLoading } = useGetTips()
  const companion = TokenStorage.getUserCompanion()
  const courseData = TokenStorage.getCourseData()
  const [showMotivation, setShowMotivation] = useState<boolean>(false)
  const [showHint, setShowHint] = useState<boolean>(false)
  const [showTips, setShowTips] = useState<boolean>(false)
  const [motivationText, setMotivationText] = useState<string>('')
  const [hintText, setHintText] = useState<string>('')
  const [tipsText, setTipsText] = useState<string>('')

  const handleShowMotivation = useCallback(
    async () => {
      try {
        const motivationResponse = await getMotivationAsync({
          companion_name: companion as string,
          subject: courseData?.course_title as string,
        })
        setMotivationText(motivationResponse.motivation)
        setShowMotivation(true)

        setTimeout(() => {
          setShowMotivation(false)
        }, 5000)
      } catch (error) {
        console.error('Error fetching motivation:', error)
      }
    }, [getMotivationAsync, companion, courseData])

  const handleShowHint = useCallback(async (params: { quiz_question: string; topic_title: string }) => {
    try {
      const response = await getHintAsync(params)
      setHintText(response.hint)
      setShowHint(true)
    } catch (error) {
      console.error('Error fetching hint:', error)
    }
  }, [getHintAsync])

  const handleShowTips = useCallback(async (params: CompanionTipsParams) => {
    try {
      const response = await getTipsAsync(params)
      setTipsText(response.tips)
      setShowTips(true)
    } catch (error) {
      console.error('Error fetching tips:', error)
    }
  }, [getTipsAsync])

  const closeMotivation = useCallback(() => setShowMotivation(false), [])
  const closeHint = useCallback(() => setShowHint(false), [])
  const closeTips = useCallback(() => setShowTips(false), [])

  return (
    <CompanionContext.Provider
      value={{
        showMotivation,
        showHint,
        showTips,
        motivationText,
        hintText,
        tipsText,
        handleShowMotivation,
        handleShowHint,
        handleShowTips,
        closeMotivation,
        closeHint,
        isHintLoading,
        isMotivationLoading,
        isTipsLoading,
        closeTips,
      }}
    >
      {children}
    </CompanionContext.Provider>
  )
}

export function useCompanion() {
  if (!CompanionContext) {
    throw new Error('useCompanion must be used within a CompanionProvider')
  }
  return useContext(CompanionContext)
} 
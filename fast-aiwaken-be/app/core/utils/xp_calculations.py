

# xp calculations
def xp_calculations(percent: float, current_xp: int, current_level: int) -> dict:
    base_xp = 100
    xp_earned = int(percent * base_xp / 100)
    if percent == 100:
        xp_earned += 20
        
    total_xp = (current_xp or 0) + xp_earned
    level = current_level or 1
    experience_to_next_level = (level * 100) - total_xp

    while total_xp >= experience_to_next_level:
        total_xp -= experience_to_next_level
        level += 1
        experience_to_next_level = level * 100

    return {
        "xp_earned" : xp_earned,
        "total_xp" : total_xp,
        "level" : level,
        "experience_to_next_level" : experience_to_next_level
    }
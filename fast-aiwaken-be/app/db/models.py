from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from app.database import Base




# save generated courses to the database
class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)  
    difficulty = Column(String, nullable=False)
    course_title = Column(String, nullable=False)
    course_description = Column(Text, nullable=True)
    sections = relationship("Section", back_populates="course", cascade="all, delete-orphan")
    # relationship to user
    user = relationship("User", back_populates="courses")

class Section(Base):
    __tablename__ = "sections"
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    section_title = Column(String, nullable=False)
    section_description = Column(Text, nullable=True)
    # course relationship to sections
    course = relationship("Course", back_populates="sections")
    topics = relationship("Topic", back_populates="section", cascade="all, delete-orphan")

class Topic(Base):
    __tablename__ = "topics"
    id = Column(Integer, primary_key=True, index=True)
    section_id = Column(Integer, ForeignKey("sections.id"), nullable=False)
    topic_title = Column(String, nullable=False)
    topic_description = Column(Text, nullable=True)
    # section relationship to topics
    section = relationship("Section", back_populates="topics")
    steps = relationship("Step", back_populates="topic", cascade="all, delete-orphan")

class Step(Base):
    __tablename__ = "steps"
    id = Column(Integer, primary_key=True, index=True)
    topic_id = Column(Integer, ForeignKey("topics.id"), nullable=False)
    step_title = Column(String, nullable=False)
    content = Column(Text, nullable=True)
    material_type = Column(String, nullable=True)
    # topic relationship to steps
    topic = relationship("Topic", back_populates="steps")




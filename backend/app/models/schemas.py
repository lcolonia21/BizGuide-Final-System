from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Business schemas
class BusinessBase(BaseModel):
    name: str
    description: str
    address: str
    phone: str
    email: EmailStr
    website: Optional[str] = None
    category: str

class BusinessCreate(BusinessBase):
    pass

class Business(BusinessBase):
    id: int
    created_at: datetime
    owner_id: int
    owner: User

    class Config:
        from_attributes = True

# Review schemas
class ReviewBase(BaseModel):
    rating: int
    comment: str

class ReviewCreate(ReviewBase):
    business_id: int

class Review(ReviewBase):
    id: int
    created_at: datetime
    user_id: int
    business_id: int
    user: User
    business: Business

    class Config:
        from_attributes = True 
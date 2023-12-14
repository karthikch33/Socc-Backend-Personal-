import JWT from 'jsonwebtoken'

export const generateToken = async(user_id)=>{
    const refreshedToken = JWT.sign({id:user_id},process.env.JWT_SECRET,{expiresIn:'1hr'})
    return refreshedToken
}

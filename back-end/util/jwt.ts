import jwt from 'jsonwebtoken';

interface JwtType {
    username: string;
    role: string;
}

function generateJwtToken({username, role} : JwtType): string {
    const options = { 
        expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, 
        issuer: 'goldenhands_app' 
    };

    try {
        return jwt.sign({username, role}, `${process.env.JWT_SECRET}`, options);
    } catch (error) {
        console.error('Error generating JWT token:', error);
        throw new Error('Error generating JWT token');
    }
}

export { generateJwtToken };

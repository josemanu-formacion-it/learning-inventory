import jwt from 'jsonwebtoken';
import { type User, type AuthResponse } from '../types/index.js';

class AuthService {
  private users: User[] = [
    {
      id: '1',
      email: 'admin@learning-inventory.com',
      password: 'password123',
      name: 'Admin Learning Inventory',
    }
  ];

  async login(email: string, password: string): Promise<AuthResponse | null> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) return null;

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1d' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return {
      token,
      user: userWithoutPassword,
    };
  }
}

export default new AuthService();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { db } from '../config/db';
import { User, Role, RegisterData, LoginData } from '../types/user';
import { RowDataPacket } from "mysql2/promise";

const authService = {
  /*** Get all movies*/
  async register(data: RegisterData): Promise<User[]> {
    const { userName, email, password, role } = data;
       // Check if email is already registered
       const [existingUser] = await db.query(
        `SELECT * FROM User WHERE email = ?`,
        [email]
      );
  
      if ((existingUser as any[]).length > 0) {
        throw new Error("Email already in use");
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Check or create the role
      let roleId: number;
      const [existingRole] = await db.query(
        `SELECT id FROM Role WHERE name = ?`,
        [role]
      );
  
      if ((existingRole as any[]).length > 0) {
        roleId = (existingRole as any[])[0].id;
      } else {
        const [roleResult] = await db.execute(
          `INSERT INTO Role (name) VALUES (?)`,
          [role]
        );
        roleId = (roleResult as any).insertId;
      }
  
      // Create the user
      const [userResult] = await db.execute(
        `INSERT INTO User (userName, email, password, createdAt) VALUES (?, ?, ?, NOW())`,
        [userName, email, hashedPassword]
      );
      const userId = (userResult as any).insertId;
  
      // Associate the user with the role
      await db.execute(
        `INSERT INTO UserRole (userId, roleId) VALUES (?, ?)`,
        [userId, roleId]
      );
  
      // Return the created user
      const [createdUser] = await db.query(
        `SELECT id, userName, email, createdAt FROM User WHERE id = ?`,
        [userId]
      );
  
      return createdUser as User[];
  },

  // Login a user
  async login(data: LoginData): Promise<{ token: string; user: User }> {
    const { email, password } = data;

    // Find user by email
    const [user] = await db.query(
      `SELECT * FROM User WHERE email = ?`,
      [email]
    );

    if ((user as any[]).length === 0) {
      throw new Error("Invalid email or password");
    }

    const foundUser = (user as any[])[0] as User;

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    // Fetch user roles
    const [roles] = await db.query(
      `SELECT Role.name FROM Role 
       JOIN UserRole ON Role.id = UserRole.roleId 
       WHERE UserRole.userId = ?`,
      [foundUser.id]
    );

    const roleNames = (roles as any[]).map((role) => role.name);
    foundUser.roles = roleNames;

    return { token, user: foundUser };
  },

  async logout(userId: number): Promise<void>{
    try {
      await db.query('DELETE FROM Token WHERE userId = ?', [userId]);
    } catch (error) {
      throw new Error(`Error during logout: ${error}`);
    }
  }
};

export default authService;

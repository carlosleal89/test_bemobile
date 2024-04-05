import { symbols, errors } from '@adonisjs/auth';
import {
  JwtUserProviderContract,
  JwtGuardOptions,
} from '../../../interfaces/i_jwt_guard.js';
import { AuthClientResponse, GuardContract } from '@adonisjs/auth/types';
import jwt from 'jsonwebtoken';
import type { HttpContext } from '@adonisjs/core/http';

export class JwtGuard<UserProvider extends JwtUserProviderContract<unknown>>
  implements GuardContract<UserProvider[typeof symbols.PROVIDER_REAL_USER]>
{
  #ctx: HttpContext;
  #userProvider: UserProvider;
  #options: JwtGuardOptions;

  constructor(
    ctx: HttpContext,
    userProvider: UserProvider,
    options: JwtGuardOptions
  ) {
    this.#ctx = ctx
    this.#userProvider = userProvider
    this.#options = options
  }
  declare [symbols.GUARD_KNOWN_EVENTS]: {}

  driverName: 'jwt' = 'jwt';

  authenticationAttempted: boolean = false;

  isAuthenticated: boolean = false;

  user?: UserProvider[typeof symbols.PROVIDER_REAL_USER];

  async generate(user: UserProvider[typeof symbols.PROVIDER_REAL_USER]) {
    const providerUser = await this.#userProvider.createUserForGuard(user);
    const token = jwt.sign({ userId: providerUser.getId() }, this.#options.secret);

    return {
      type: 'bearer',
      token: token
    }
  }

  /**
   * Authenticate the current HTTP request and return
   * the user instance if there is a valid JWT token
   * or throw an exception
   */
  async authenticate(): Promise<UserProvider[typeof symbols.PROVIDER_REAL_USER]> {
    if (this.authenticationAttempted) {
      return this.getUserOrFail()
    }
    this.authenticationAttempted = true;

    const authHeader = this.#ctx.request.header('authorization');

    if (!authHeader) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    const [, token] = authHeader.split('Bearer ');

    if (!token) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      });
    }

    const payload = jwt.verify(token, this.#options.secret)
    if (typeof payload !== 'object' || !('userId' in payload)) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    const providerUser = await this.#userProvider.findById(payload.userId);

    if (!providerUser) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      });
    }

    this.user = providerUser.getOriginal();
    return this.getUserOrFail();
  }

  async check(): Promise<boolean> {
    try {
      await this.authenticate();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Returns the authenticated user or throws an error
   */
  getUserOrFail(): UserProvider[typeof symbols.PROVIDER_REAL_USER] {
    if (!this.user) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    return this.user
  }

  /**
   * This method is called by Japa during testing when "loginAs"
   * method is used to login the user.
   */
  async authenticateAsClient(
    user: UserProvider[typeof symbols.PROVIDER_REAL_USER]
  ): Promise<AuthClientResponse> {
    const token = await this.generate(user)
    return {
      headers: {
        authorization: `Bearer ${token.token}`,
      },
    }
  }
}


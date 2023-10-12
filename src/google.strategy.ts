import { Strategy, Profile, StrategyOptionsWithRequest, VerifyCallback  } from 'passport-google-oauth20';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: '533989453586-mr0u0t0l1d3adpkgq2fjjfvb08j48vhb.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
    } as StrategyOptionsWithRequest);
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }
        done(null, user);
}
}

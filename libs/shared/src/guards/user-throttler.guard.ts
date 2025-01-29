import { ThrottlerGuard } from '@nestjs/throttler';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ThrottlerLimitDetail } from '@nestjs/throttler/dist/throttler.guard.interface';

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
  public async getErrorMessage(
    _context: ExecutionContext,
    throttlerLimitDetail: ThrottlerLimitDetail,
  ): Promise<string> {
    const { timeToBlockExpire } = throttlerLimitDetail;

    return `Too many requests. Try again in ${timeToBlockExpire} second${timeToBlockExpire === 1 ? '' : 's'}`;
  }

  public async getTracker(
    req: Request & { user: { id: number } },
  ): Promise<string> {
    return req.user?.id?.toString();
  }
}

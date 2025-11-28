import type {
  MatchmakingJoinPayload,
  RatingSnapshot,
  TimeControl,
} from '@chess/contracts';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class RatingSnapshotDto implements RatingSnapshot {
  @IsNumber()
  @Min(100)
  @Max(4000)
  rating!: number;

  @IsNumber()
  @IsPositive()
  deviation!: number;

  @IsNumber()
  @IsPositive()
  volatility!: number;
}

export class MatchmakingJoinDto implements MatchmakingJoinPayload {
  @IsUUID(4)
  userId!: string;

  @IsIn(['bullet', 'blitz', 'rapid', 'classical'])
  timeControl!: TimeControl;

  @ValidateNested()
  @Type(() => RatingSnapshotDto)
  rating!: RatingSnapshotDto;

  @IsNumber()
  @IsPositive()
  latencyMs!: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  preferredRange?: number;

  @IsString()
  deviceFingerprint!: string;
}

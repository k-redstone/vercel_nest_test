import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator'

export class CreateStreamerDto {
  @IsNotEmpty({ message: '해시 ID는 필수 입력 값입니다.' })
  @IsString({ message: '해시 ID는 문자열이어야 합니다.' })
  hashId: string

  @Length(1, 20, { message: '닉네임은 최소 1자부터 최대 20자까지 가능합니다.' })
  @IsNotEmpty({ message: '닉네임은 필수 입력 값입니다.' })
  @IsString({ message: '닉네임은 문자열이어야 합니다.' })
  nickname: string

  @IsNotEmpty({ message: '프로필 이미지는 필수 입력 값입니다.' })
  @IsString({ message: '프로필은 문자열이어야 합니다.' })
  profileImageUrl: string
}

import styled from '@emotion/styled'
import { useMutation } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { MdWbSunny } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { axiosAPI } from '@/apis/axios'
import AlertText from '@/components/common/AlertText'
import BackChevron from '@/components/common/BackChevron'
import NormalButton from '@/components/common/Buttons/NormalButton'
import { FlexBox } from '@/components/common/Flexbox'
import RegisterInput from '@/components/common/RegisterInput'
import SelectorButtonContainer from '@/components/common/SelectorButtonContainer'
import Spacing from '@/components/common/Spacing'
import { Text } from '@/components/common/Text'
import useToast from '@/hooks/useToast'
import useInterestStore from '@/store/InterestStore'
import { palette } from '@/styles/palette'

const RegisterCompany = () => {
  const InterestList = [
    '경영',
    '영업',
    '유통',
    'IT',
    '디자인',
    '전문직',
    '미디어',
    '생산/제조',
    '연구개발',
    '기획/마케팅',
  ]
  const navigate = useNavigate()
  const { authCode } = useLocation().state || {}
  const inputRef = useRef<HTMLInputElement>(null)
  const [doubleChecked, setDoubleChecked] = useState<null | boolean>(false)
  const [nicknameDuplicated, setNicknameDuplicated] = useState<null | boolean>(null)
  let nickname = ''
  const { interestList } = useInterestStore()
  const { showToast } = useToast()

  const handleClickEmailVerify = async (nickname: string) => {
    return await axiosAPI.get(`/v1/users/duplicate?nickname=${nickname}`)
  }
  const emailVerifyMutation = useMutation((nickname: string) => handleClickEmailVerify(nickname), {
    onSuccess: (response) => {
      if (response.status == 200) {
        //사용가능한 닉네임일 경우
        setDoubleChecked(true)
        setNicknameDuplicated(false)
      } else {
        //이미 사용 중인 닉네임일 경우
        setDoubleChecked(true)
        setNicknameDuplicated(true)
      }
    },
    onError: () => {},
  })

  const getAlertMessage = (nicknameDuplicated: boolean | null, doubleChecked: boolean | null) => {
    if (nicknameDuplicated === null && doubleChecked === null) {
      return { message: '닉네임 중복검사를 해주세요!', color: palette.RED }
    } else if (nicknameDuplicated === false && doubleChecked) {
      return { message: '사용 가능한 닉네임입니다.', color: palette.PRIMARY }
    } else if (nicknameDuplicated === true && doubleChecked) {
      return { message: '이미 사용 중인 닉네임입니다.', color: palette.RED }
    } else {
      return null // 혹은 기본 메시지 객체를 반환
    }
  }

  const alertInfo = getAlertMessage(nicknameDuplicated, doubleChecked)

  const doubleCheckNickName = async () => {
    if (inputRef.current && inputRef.current.value.length == 0) {
      setDoubleChecked(null)
      return
    }
    if (inputRef.current == null) {
      return
    }

    nickname = inputRef.current.value
    emailVerifyMutation.mutate(nickname)
  }
  const formValidation = () => {
    if (nickname.length === 0) return false
    else if (doubleChecked) return false
    else if (nicknameDuplicated) return false
    else return true
  }
  const submitUserProfileData = () => {
    if (!formValidation()) {
      console.log(nickname, interestList)
      if (doubleChecked && inputRef.current !== null && interestList.length > 0) {
        const body = {
          authCode: authCode,
          nickname: nickname,
          keywords: interestList,
          oAuthProvider: 'KAKAO',
        }
        console.log(body)
        registerMutation.mutate(body)
      }
    }
  }
  const registerPost = async (body: object) => {
    return await axiosAPI.post('/v1/users/sign-up', body)
  }
  const registerMutation = useMutation((body: object) => registerPost(body), {
    onSuccess: (response) => {
      console.log(response)
      navigate('/')
    },
    onError: () => {
      showToast({
        message: '회원가입에 실패했습니다.',
        type: 'error',
        isDarkMode: false,
      })
    },
  })

  return (
    <StyleRegisterWrapper>
      <StyleRegisterHeader>
        <Spacing size={64} />
        <FlexBox gap={10} fullWidth={true} justify={'space-around'}>
          <StyleIcon>
            <BackChevron
              hasBackground={true}
              prevClick={() => {
                navigate('/register/user')
              }}
            />
          </StyleIcon>
          <StyleHeaderText font={'Body_24'} fontWeight={600} letterSpacing={-2}>
            {'회사 인증'}
          </StyleHeaderText>
          <StyleIcon>
            <MdWbSunny size={20} color={palette.TERTIARY} />
          </StyleIcon>
        </FlexBox>
        <Spacing size={11} />
        <StyleDivider />
      </StyleRegisterHeader>
      <Spacing size={73} />
      <FlexBox gap={16}>
        <RegisterInput width={260} placeholder={'회사 이메일'} ref={inputRef} />
        <NormalButton normalButtonType={'email-certify'} onClick={() => doubleCheckNickName()}>
          {'이메일 인증'}
        </NormalButton>
      </FlexBox>

      {alertInfo ? (
        <AlertText padding={'10px'} textAlign={'end'} fontSize={`11px`} fontColor={alertInfo.color}>
          {alertInfo.message}
        </AlertText>
      ) : (
        <Spacing size={31} />
      )}
      <FlexBox
        gap={16}
        style={{
          position: 'relative',
        }}
      >
        <RegisterInput width={348} placeholder={'인증코드 6자리 입력'} ref={inputRef} />
        <StyleVerificationEmailButton onClick={() => doubleCheckNickName()}>
          {'확인'}
        </StyleVerificationEmailButton>
      </FlexBox>

      {alertInfo ? (
        <AlertText padding={'10px'} textAlign={'end'} fontSize={`11px`} fontColor={alertInfo.color}>
          {alertInfo.message}
        </AlertText>
      ) : (
        <Spacing size={31} />
      )}
      <Spacing size={24} />
      <FlexBox
        direction={'column'}
        align={'flex-start'}
        style={{
          padding: '0 18px',
        }}
      >
        <StyleInterestText
          font={'Body_18'}
          fontWeight={600}
          letterSpacing={-0.5}
          style={{
            marginBottom: '6px',
          }}
        >
          {'직무정보'}
        </StyleInterestText>
        <SelectorButtonContainer
          isDarkMode={false}
          buttonNames={InterestList}
          maxLength={4}
        ></SelectorButtonContainer>
      </FlexBox>

      <StyleSubmitButtonWrapper>
        <NormalButton normalButtonType={'form-submit'} onClick={submitUserProfileData}>
          {'등록 완료'}
        </NormalButton>
      </StyleSubmitButtonWrapper>
    </StyleRegisterWrapper>
  )
}
const StyleRegisterWrapper = styled.div`
  background-color: ${palette.GRAY100};
  height: 100%;
`
const StyleRegisterHeader = styled.div``
const StyleHeaderText = styled(Text)``
const StyleDivider = styled.hr`
  height: 1px;
  background-color: ${palette.GRAY200};
  border: 0;
`
const StyleInterestText = styled(Text)``
const StyleSubmitButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  position: absolute;
  bottom: 22px;
`
const StyleIcon = styled.button`
  cursor: pointer;
`

const StyleVerificationEmailButton = styled.button`
  width: 42px;
  height: 25px;
  background-color: ${palette.TERTIARY};
  position: absolute;
  right: 30px;
  color: ${palette.WHITE};
  border-radius: 10px;
  font-size: 12px;
  font-family: 'Pretendard-Regular';
  letter-spacing: -1px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
`
export default RegisterCompany

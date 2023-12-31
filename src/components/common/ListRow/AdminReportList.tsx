import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'

import AdminReportAPI from '@/apis/adminReport/AdminReportApi'
import AdminReportListRow from '@/components/common/ListRow/AdminReportListRow'
import AdminReportListRowTitle from '@/components/common/ListRow/AdminReportListRowTitle'
import { palette } from '@/styles/palette'

interface AdminReportListProps {
  onReportSelect: (nickname: string) => void
}
interface ReportData {
  targetedNickname: string
  chattingRoomName: string
  targetedId: number
  chattingRoomId: number
  createdAt: string
}
interface ReportData {
  targetedNickname: string
  chattingRoomName: string
  targetedId: number
  chattingRoomId: number
  createdAt: string
}
const AdminReportList = ({ onReportSelect }: AdminReportListProps) => {
  const { data, isSuccess } = useQuery(['ReportedUserList'], AdminReportAPI.GET_REPORT_LIST)
  const reportDatas = data?.data.contents
  const handlePersonReported = (nickname: string) => {
    onReportSelect(nickname)
  }
  // const ReportDatas = data?.data.reports
  //실제 response 데이터 예시
  // {
  //   "targetedNickname": "유명한",
  //   "chattingRoomName": "채팅방1",
  //   "targetedId": 7347,
  //   "chattingRoomId": 1413,
  //   "createdAt": "2014-01-04T19:39:52.241736129"
  // },
  // {
  //   "targetedNickname": "박상민",
  //   "chattingRoomName": "채팅방2",
  //   "targetedId": 3296,
  //   "chattingRoomId": 9438,
  //   "createdAt": "2025-01-17T13:41:40.815311"
  // }
  //createdAt 변환 필요. '-' -> '.'으로도 변환
  // const mockData = [
  //   { chattingRoomName: '채팅방1', targetedNickname: '유명한', createdAt: '2023.11.23' },
  //   { chattingRoomName: '채팅방2', targetedNickname: '박상민', createdAt: '2023.11.22' },
  //   { chattingRoomName: '채팅방3', targetedNickname: '박은지', createdAt: '2023.11.22' },
  //   { chattingRoomName: '채팅방4', targetedNickname: '주다현', createdAt: '2023.11.15' },
  //   { chattingRoomName: '채팅5', targetedNickname: '남궁호수', createdAt: '2023.10.29' },
  //   { chattingRoomName: '채팅방6', targetedNickname: '우창욱', createdAt: '2023.10.26' },
  //   { chattingRoomName: '채팅방칠', targetedNickname: '유명한', createdAt: '2023.10.26' },
  //   { chattingRoomName: '채팅방팔', targetedNickname: '박상민', createdAt: '2023.10.26' },
  //   { chattingRoomName: '채팅방9', targetedNickname: '박은지', createdAt: '2023.10.23' },
  // ]

  return (
    <StyledAdminReportListContainerOuterWrapper>
      <StyledAdminReportListContainer>
        {isSuccess && (
          <>
            <AdminReportListRowTitle
              chattingRoomName={'채팅방 이름'}
              height={71}
              isDarkMode={false}
              reportedNickname={'신고 대상 닉네임'}
              reportedDate={'신고 날짜'}
            ></AdminReportListRowTitle>
            {reportDatas.length > 0 ? (
              reportDatas.map((reportData: ReportData, index: number) => (
                <AdminReportListRow
                  targetedNickname={reportData.targetedNickname}
                  key={index}
                  height={71}
                  chattingRoomName={reportData.chattingRoomName}
                  reportedDate={reportData.createdAt}
                  isDarkMode={false}
                  onClick={() => handlePersonReported(reportData.targetedNickname)}
                />
              ))
            ) : (
              <StyledNoReportListAlertText>
                {'현재 신고 내역이 없습니다!'}
              </StyledNoReportListAlertText>
            )}
          </>
        )}
        {/* {isSuccess && (
          <>
            <AdminReportListRowTitle
              chattingRoomName={'채팅방 이름'}
              height={71}
              isDarkMode={false}
              reportedNickname={'신고 대상 닉네임'}
              reportedDate={'신고 날짜'}
            ></AdminReportListRowTitle>
            {ReportDatas.map((reportListData: ReportListData, index: number) => (
              <AdminReportListRow
                reportedNickname={reportListData.reportedUserName}
                key={index}
                height={71}
                chattingRoomName={reportListData.chattingRoomName}
                reportedDate={reportListData.reportedDate}
                chattingRoomName={reportListData.chattingRoomName}
                reportedDate={reportListData.reportedDate}
                isDarkMode={false}
                onClick={() => handlePersonReported(reportListData.reportedUserName)}
              />
            ))}
          </>
        )} */}
      </StyledAdminReportListContainer>
    </StyledAdminReportListContainerOuterWrapper>
  )
}
const StyledAdminReportListContainer = styled.div`
  background-color: ${palette.WHITE};
  overflow: scroll;
  height: 591px;
  width: 80%;
  margin: auto;
  cursor: pointer;
`
const StyledAdminReportListContainerOuterWrapper = styled.div`
  background-color: ${palette.WHITE};
  width: 100%;
`
const StyledNoReportListAlertText = styled.p`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  padding-top: 20px;
  color: ${palette.GRAY500};
`

export default AdminReportList

import styled from '@emotion/styled'

import AdminReportListRow from '@/components/common/ListRow/AdminReportListRow'
import { palette } from '@/styles/palette'
interface AdminReportListProps {
  onReportSelect: (nickname: string) => void
}
const AdminReportList = ({ onReportSelect }: AdminReportListProps) => {
  const handlePersonReported = (nickname: string) => {
    onReportSelect(nickname)
  }
  const AdminReportListData = [
    { nickname: '유명한', height: 60, infoMessage: '누적 1회', isDarkMode: false },
    { nickname: '박상민', height: 60, infoMessage: '누적 2회', isDarkMode: false },
    { nickname: '박은지', height: 60, infoMessage: '누적 2회', isDarkMode: false },
    { nickname: '주다현', height: 60, infoMessage: '누적 1회', isDarkMode: false },
    { nickname: '남궁호수', height: 60, infoMessage: '누적 1회', isDarkMode: false },
    { nickname: '우창욱', height: 60, infoMessage: '누적 2회', isDarkMode: false },
    { nickname: '홍길동', height: 60, infoMessage: '누적 1회', isDarkMode: false },
    { nickname: '홍길동', height: 60, infoMessage: '누적 1회', isDarkMode: false },
    { nickname: '홍길동', height: 60, infoMessage: '누적 1회', isDarkMode: false },
    { nickname: '홍길동', height: 60, infoMessage: '누적 1회', isDarkMode: false },
    { nickname: '홍길동', height: 60, infoMessage: '누적 1회', isDarkMode: false },
    { nickname: '홍길동', height: 60, infoMessage: '누적 1회', isDarkMode: false },
    { nickname: '홍길동', height: 60, infoMessage: '누적 1회', isDarkMode: false },
    { nickname: '홍길동', height: 60, infoMessage: '누적 1회', isDarkMode: false },
  ]

  return (
    <StyledAdminReportListContainer>
      {AdminReportListData.map((data, index) => (
        <AdminReportListRow
          key={index}
          {...data}
          onClick={() => handlePersonReported(data.nickname)}
        />
      ))}
    </StyledAdminReportListContainer>
  )
}
const StyledAdminReportListContainer = styled.div`
  background-color: ${palette.WHITE};
  overflow: scroll;
  height: 500px;
`
export default AdminReportList

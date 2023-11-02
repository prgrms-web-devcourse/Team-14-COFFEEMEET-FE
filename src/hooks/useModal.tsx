import Modal from '@/components/common/Modal'
import useModalStore from '@/store/ModalStore'

type ModalConfirmPropsType = {
  type: 'warn' | 'confirm'
  okFunc: () => void
  mainText: string
  subText?: string
}
export const useModal = () => {
  const { setModalState, setOkFunc, setMainText, setSubText, setType } = useModalStore()

  const openModal = ({ mainText, subText, okFunc, type }: ModalConfirmPropsType) => {
    setModalState(true)
    setType(type)
    setMainText(mainText)
    setSubText(subText)
    setOkFunc(okFunc)
  }

  return { openModal, Modal }
}

import type { FC } from 'react'
import { ScaleLoader } from 'react-spinners'

interface LoadingSpinnerProps {
  smallHeight?: boolean
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ smallHeight = false }) => {
  return (
    <div
      className={`
        ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
        flex
        flex-col
        justify-center
        items-center
      `}
    >
      <ScaleLoader  color="red" />
    </div>
  )
}

export default LoadingSpinner

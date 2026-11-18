import { ClipLoader } from 'react-spinners'

const override = {
  display: 'block',
  margin: '0 auto',
}

const Spinner = ({ color = '#38bdf8', size = 60 }) => {
  return (
    <div className="spinner-wrapper" aria-label="Loading spinner">
      <ClipLoader
        color={color}
        size={size}
        cssOverride={override}
        aria-label="Loading..."
      />
    </div>
  )
}

export default Spinner


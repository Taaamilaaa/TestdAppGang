// import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { ThreeCircles} from 'react-loader-spinner'


 function Loading() {
    return <ThreeCircles
  height="250"
  width="250"
  color="rgba(4, 242, 250, 0.562)"
  wrapperStyle={{}}
  wrapperClass="loader"
  visible={true}
  ariaLabel="three-circles-rotating"
  outerCircleColor=""
  innerCircleColor=""
  middleCircleColor=""
/>
}
export default Loading
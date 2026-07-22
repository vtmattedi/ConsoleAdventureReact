import MWLoading from '../../MattediWorks/MWLoading'
import { terminalAssets } from '../../assets/terminalAssets'

const preloadImages = [
  terminalAssets.rtsim.readmeScreenshots,
  terminalAssets.mattediWorks.logo,
  terminalAssets.mattediWorks.logoWithName,
  terminalAssets.mattediWorks.logoWhite,
  terminalAssets.mattediWorks.loadingLogo,
  terminalAssets.mattediWorks.photo,
].flat()

const preloadStyle = {
  position: 'fixed',
  width: 1,
  height: 1,
  overflow: 'hidden',
  opacity: 0,
  pointerEvents: 'none',
  left: -9999,
  top: -9999,
}

export default function AssetPreload({ loadingLabel = 'Loading' }) {
  return (
    <div aria-hidden="true" style={preloadStyle}>
      {preloadImages.map((asset) => (
        <img key={asset} src={asset} alt="" loading="eager" />
      ))}
      <MWLoading show={false} label={loadingLabel} />
    </div>
  )
}

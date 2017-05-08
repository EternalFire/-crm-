import React, { PropTypes } from 'react'
import { Icon, Switch } from 'antd'
import styles from './main.less'
import { config } from '../../utils'
import Menus from './menu'

function Sider ({ user, siderFold, darkTheme, location, changeTheme, navOpenKeys, changeOpenKeys, switchMenuPopover }) {
  const menusProps = {
    user,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
    handleClickNavMenu: switchMenuPopover,    
  }
  return (
    <div>
      <div className={styles.logo}>
        <img src={config.logoSrc} />
        {siderFold ? '' : <span>{`${config.logoText} `} <small>{config.version}</small> </span>}
      </div>
      <Menus {...menusProps} />
      <div className={styles.foot}>
        {config.footerText}
      </div>
    </div>
  )
}

// Sider.propTypes = {
//   siderFold: PropTypes.bool,
//   darkTheme: PropTypes.bool,
//   location: PropTypes.object,
//   changeTheme: PropTypes.func,
//   navOpenKeys: PropTypes.array,
//   changeOpenKeys: PropTypes.func
// }

export default Sider

// {!siderFold ? <div className={styles.switchtheme}>
//   <span><Icon type='bulb' />切换主题</span>
//   <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren='黑' unCheckedChildren='白' />
// </div> : ''}

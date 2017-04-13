import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router';
import Login from './login'
import Header from '../components/layout/header'
// import Bread from '../components/layout/bread'
// <Bread location={location} />
import Footer from '../components/layout/footer'
import Sider from '../components/layout/sider'
import styles from '../components/layout/main.less'
import { Spin, Modal } from 'antd'
import { classnames, center } from '../utils'
import '../components/layout/common.less'

function App ({children, location, dispatch, app}) {
  const {login, loading, isLoginFail, loginButtonLoading, user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys} = app
  const loginProps = {
    loading,
    loginButtonLoading,
    onOk (data) {
      dispatch({type: 'app/login', payload: data})
    }
  }

  const headerProps = {
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({type: 'app/switchMenuPopver'})
    },
    logout () {
      Modal.confirm({
        title: '确定退出登陆吗?',
        onOk() {
          dispatch(routerRedux.push({ pathname: '/' })); // 修改URL
          dispatch({ type: 'app/logout' })
        },
        onCancel() {}
      });
    },
    switchSider () {
      dispatch({type: 'app/switchSider'})
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    }
  }

  function clearLoginFail() {
    dispatch({ type: 'app/clearLoginFail' });
  }

  const siderProps = {
    user,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    // 点击菜单回调
    switchMenuPopover (e) {
      dispatch({ type: 'app/handleClickMenu', payload: { openKey: e.key } })
    },
    changeTheme () {
      dispatch({type: 'app/changeTheme'})
    },
    changeOpenKeys (openKeys) {      
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    }
  }

  return (
    <div>
      {login ? 
        <div className={classnames(styles.layout, {[styles.fold]: isNavbar ? false : siderFold}, {[styles.withnavbar]: isNavbar})}>
          {!isNavbar ? <aside className={classnames(styles.sider, {[styles.light]: !darkTheme})}>
            <Sider {...siderProps} />
          </aside> : ''}
          <div className={styles.main}>
            <Header {...headerProps} />            
            <div className={styles.container}>
              <div className={styles.content}>
                {children}
              </div>
            </div>
            {
              // <Footer />
            }
          </div>
        </div>
        : <div className={styles.spin}>
            <Spin tip='加载用户信息...' spinning={loading} size='large'>
              <Login {...loginProps} />
            </Spin>
          </div>
      }      
      <Modal title="提示" 
        onOk={() => {
          clearLoginFail()
        }} 
        onCancel={() => {
          clearLoginFail()
        }}
        visible={isLoginFail}
      >
        登录失败
      </Modal>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object
}

export default connect(({app}) => ({app}))(App)

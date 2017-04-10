import React from 'react'
import {Card, Alert} from 'antd'
import styles from './qr.css'

const QR = ({center, centerName}) => {
  return (
    <Card className={styles.container}>
      <h1>签到二维码 [<span className={styles.textRed}>{centerName}</span>] </h1>
      <img src={`images/${center}qrcode.png`} />
      <Alert message="当学员来到前台面试, 扫此二维码填写资料! 可以将二维码打印出来, 放置在前台。" type="warning" />
    </Card>
  );
}

export default QR
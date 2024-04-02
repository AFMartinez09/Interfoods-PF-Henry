import { ReactNode } from 'react'
// import styles from './Layout.modules.css'

interface LayoutProps {
  children: ReactNode;
}
// El primer div nos ayuda a centrar el contenido
// y lo que no querramos que esté centrado va hacia la izquierda
const Layout = ({ children }: LayoutProps ) => {
  return (
    // <div className={styles.layout}>
      // <div className={styles.container}>
        {children}
      // </div>
    // </div>
  )
}

export default Layout
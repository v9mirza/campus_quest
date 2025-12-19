import React from 'react'
import "../styles/Header.css"

const Header = () => {
  return (
    <header class="app-header">
  <div class="left-logo">
    <img src="/campus-quest.png" alt="Campus Quest Logo" />
    <span>Campus Quest</span>
  </div>

  <div class="right-logo">
    <img src="/integral-logo.png" alt="Integral University Logo" />
  </div>
</header>
  )
}

export default Header
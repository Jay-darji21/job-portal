import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="bg-[#6A38C2] text-white text-center py-4 shadow-md">
      <div className="container mx-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Job Portal. All rights reserved.</p>
      </div>
    </footer>

    </div>
  )
}

export default Footer

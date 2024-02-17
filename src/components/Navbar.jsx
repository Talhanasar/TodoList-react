const Navbar = () => {
  return (
    <nav className="flex justify-between sm:justify-around items-center py-2 px-6 bg-primary text-white">
      <div className="logo text-xl"><b className="text-third text-2xl">T</b>asks</div>
      <ul className="flex gap-2">
        {['Home','Your Tasks','Contact Us'].map((item,index)=>{
          return <li key={index} className="py-1 px-1 sm:px-3 cursor-pointer hover:text-third transition-all duration-100 text-sm sm:text-lg">{item}</li>
        })}
      </ul> 
    </nav>
  )
}

export default Navbar

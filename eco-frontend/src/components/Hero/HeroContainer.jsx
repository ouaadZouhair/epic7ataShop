

const HeroContainer = (props) => {
  return (
    <header className='flex flex-col justify-between items-center mx-auto w-full h-auto mt-3 md:w-[95%] lg:w-[80%] gap-6'>
        {props.children}
    </header>
  )
}

export default HeroContainer
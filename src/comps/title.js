const Title = ({ text }) => {
  return (
    <div className="mb-12">
      <h1 className="font-semibold text-4xl md:text-6xl">{ text }</h1>
      <div className="mt-4 border-b-4 border-red-200 w-full"></div>
    </div>
  );
}
 
export default Title;
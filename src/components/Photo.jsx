const Photo = ({ image, handleRemove }) => {

  return (
    <li>
      <img src={image} alt={image} />
      <button onClick={() => handleRemove(image)}>X</button>
    </li>
  )
}

export default Photo;
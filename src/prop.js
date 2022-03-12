export function Prop(props) {
  return (
    <div className='layerProperties_item'>
      <div className='key'>{props.title}</div>
      <div className='value'>{props.value}</div>
    </div>
  );
}

import classes from './Backdrop.module.css';

const Backdrop: React.FC<{ onSideMenuToggle: () => void }> = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onSideMenuToggle}></div>
  );
};

export default Backdrop;

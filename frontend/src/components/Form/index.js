import Error from './Error';
export default function Form ({ children, errors, submit }) {
  return (
    <div className='FormPage'>
      <Error errors={errors} />
      <form
        onSubmit={submit}
        className='form'
      >
        {children}
      </form>
    </div>
  );
}

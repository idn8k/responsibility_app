import { useState } from 'react';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);

    console.log(userData);
  }
  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Your Name</label>
          <input required type="text" id="name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input required type="text" id="name" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="name">Password</label>
          <input required type="text" id="name" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <input type="submit" value="Register" />
      </form>
    </>
  );
}

export default RegisterForm;

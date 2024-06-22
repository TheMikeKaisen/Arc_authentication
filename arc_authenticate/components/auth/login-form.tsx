import CardWrapper from "./card-wrapper"

const LoginForm = () => {
  return (
    <CardWrapper
        headerLabel="Welcome back"
        backButtonHref="/auth/register"
        backButtonLabel="Don't have an account?"
        showSocial
    >
      login form!
    </CardWrapper>
  )
}

export default LoginForm

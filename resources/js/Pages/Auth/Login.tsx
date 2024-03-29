import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Button, Input } from "@/Components/MidwayComponents";
import SecondaryButton from "@/Components/SecondaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, transform, errors, reset } = useForm(
    {
      email: "",
      password: "",
      remember: false,
    },
  );

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  transform((data) => {
    data.email = data.email.toLowerCase();
    return {
      ...data,
    };
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("login"));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="email" value="Email" />
          {/* <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData("email", e.target.value)}
          /> */}
          <Input
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full text-left focus:border-border  active:border-border"
            autoComplete="username"
            onChange={(e) => setData("email", e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          {/* <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData("password", e.target.value)}
          /> */}
          <Input
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full text-left ring-0"
            autoComplete="current-password"
            onChange={(e) => setData("password", e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4 block">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData("remember", e.target.checked)}
            />
            <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
              Remember me
            </span>
          </label>
        </div>

        <div className="mt-4 flex items-center ">
          <div className="flex justify-between">
            {canResetPassword && (
              <Link
                href={route("password.request")}
                className=" rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
              >
                Forgot your password?
              </Link>
            )}

            <Link href={route("register")} className="">
              <SecondaryButton
                type="button"
                className="rounded-none px-0"
                tabIndex={-1}
                disabled={processing}
              >
                Create New Account
              </SecondaryButton>
            </Link>

            {/* <PrimaryButton className="ms-4 min-w-[83px]" disabled={processing}>
              Log in
            </PrimaryButton> */}
            <Button
              className="ms-4 min-w-[83px]"
              disabled={processing}
              type="submit"
              color="primary"
            >
              Log in
            </Button>
          </div>
        </div>
      </form>
    </GuestLayout>
  );
}

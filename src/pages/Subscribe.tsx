import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import CodeMockupImge from "../assets/code-mockup.png";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";
export function Subscribe() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createSubscriber({ variables: { name, email } });

    navigate("/event");
  }
  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex flex-col md:flex-row items-center justify-between mt-20 md:mx-auto">
        <div className="max-w-[640px] text-center md:text-left flex flex-col items-center md:items-start p-2 md:p-0">
          <Logo />

          <h1 className=" mt-8 text-[2.rem] leading-tight">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4  text-gray-200 leading-relaxed mb-8 md:mb-0">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded w-full md:w-auto">
          <strong className="text-2xl ">Inscreva-se gratuitamente</strong>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-2 w-full mt-8"
          >
            <input
              type="text"
              placeholder="Seu nome completo"
              name="name"
              className="bg-gray-900 rounded px-5 h-14"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="email"
              placeholder="Digite seu email"
              className="bg-gray-900 rounded px-5 h-14"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              disabled={loading}
              type="submit"
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img
        src={CodeMockupImge}
        alt="code image mockup"
        className="my-10 md:my-0"
      />
    </div>
  );
}

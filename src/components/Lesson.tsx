import classname from "classnames";
import { format, isPast } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { CheckCircle, Lock } from "phosphor-react";
import { Link, useParams } from "react-router-dom";
type LessonProps = {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
};
export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();

  const availableDateFormatted = format(
    props.availableAt,
    "EEEE' •  'd' de 'MMMM' • 'k'h'mm",
    { locale: ptBr }
  );
  const isLessonAvailable = isPast(props.availableAt);

  console.log(slug);
  console.log(props.slug);
  const isActiveLesson = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div
        className={classname(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",
          {
            "bg-green-500": isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classname(
                "text-sm  font-medium flex items-center gap-2",
                {
                  "text-white": isActiveLesson,
                  "text-blue-500": !isActiveLesson,
                }
              )}
            >
              <CheckCircle size={20} />
              Contéudo liberado
            </span>
          ) : (
            <span
              className={
                "text-sm text-orange-500 font-medium flex items-center gap-2"
              }
            >
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span
            className={classname(
              "text-xs rounded py-[0.125rem] px-2 text-white border  font-bold",
              {
                "border-white": isActiveLesson,
                "border-green-300": !isActiveLesson,
              }
            )}
          >
            {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>

        <strong
          className={classname(" mt-5 block", {
            "text-white": isActiveLesson,
            "text-gray-200": !isActiveLesson,
          })}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  );
}

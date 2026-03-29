import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { userSchema } from "../../../types/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../components/api/api";
import { SuccessPopup } from "../../components/popup/popup";
import avatar from "../../components/img/avatar.jpg";
import styles from "./user-info-page.module.scss";
import { Icon } from "../../icons/icon";
import { InputField } from "../../components/iput-field/input-field";

type UserFormValues = z.infer<typeof userSchema>;

type ApiUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: { city: string };
  phone: string;
  company: { name: string };
};

export const UserInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async (): Promise<ApiUser> => {
      const res = await api.get(`users/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      city: "",
      phone: "",
      company: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        username: user.username ?? "",
        email: user.email ?? "",
        city: user.address?.city ?? "",
        phone: user.phone ?? "",
        company: user.company?.name ?? "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UserFormValues) => {
    localStorage.setItem(`user-${id}`, JSON.stringify(data));
    setShowSuccess(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <section>
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
      <div className={styles.wrapper}>
        <div className={styles.buttonWrapper}>
          <button type="button" onClick={handleBack}>
            <Icon name="backarrow" className={styles.backarrow} />
            Назад
          </button>
        </div>
        <div className={styles.container}>
          <div className={styles.left}>
            <img src={avatar} alt="user avatar" className={styles.avatar} />
            <ul className={styles.navigation}>
              <li>Данные профиля</li>
              <li>Рабочее пространство</li>
              <li>Приватность</li>
              <li>Безопасность</li>
            </ul>
          </div>
          <div className={styles.right}>
            <div className={styles.header}>
              <h2>Данные профиля</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                name="name"
                label="Имя"
                register={register}
                watch={watch}
                setValue={setValue}
                error={errors.name}
              />

              <InputField
                name="username"
                label="Никнейм"
                register={register}
                watch={watch}
                setValue={setValue}
                error={errors.username}
              />

              <InputField
                name="email"
                label="Почта"
                register={register}
                watch={watch}
                setValue={setValue}
                error={errors.email}
              />

              <InputField
                name="city"
                label="Город"
                register={register}
                watch={watch}
                setValue={setValue}
                error={errors.city}
              />

              <InputField
                name="phone"
                label="Телефон"
                register={register}
                watch={watch}
                setValue={setValue}
                error={errors.phone}
              />

              <InputField
                name="company"
                label="Название компании"
                register={register}
                watch={watch}
                setValue={setValue}
                error={errors.company}
              />

              <button type="submit" className={styles.submit}>
                Сохранить
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

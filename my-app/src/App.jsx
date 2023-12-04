import styles from './App.module.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.required('Поле адреса электронной почты не заполнено')
		.matches(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Некоректный адрес электронной почты',
		),
	password: yup
		.string()
		.required('Поле пароля не заполнено')
		.matches(
			/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
			'Пароль должен состоять из не менее 6 символов, содержать латинские буквы верхнего и нижнего регистра, по крайней мере один специальный символ и одну цифру',
		),
	repeatPassword: yup
		.string()
		.required('Поле подтверждения пароля не заполнено')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const App = () => {
	const [checkMessage, setCheckMessage] = useState();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		resolver: yupResolver(fieldsSchema),
	});

	const sendFormData = (formData) => {
		console.log(formData);

		setCheckMessage('Вы успешно зарегистрированы');
		reset();
		setTimeout(setCheckMessage, 3000);
	};

	const alertMessageEmail = errors.email?.message;
	const alertMessagePassword = errors.password?.message;
	const alertMessageRepeatPassword = errors.repeatPassword?.message;

	return (
		<div className={styles.app}>
			<section className={styles.firstSection}>
				{alertMessageEmail && (
					<div className={styles.alertMessage}>{alertMessageEmail}</div>
				)}
				{alertMessagePassword && (
					<div className={styles.alertMessage}>{alertMessagePassword}</div>
				)}
				{alertMessageRepeatPassword && (
					<div className={styles.alertMessage}>
						{alertMessageRepeatPassword}
					</div>
				)}
				{checkMessage && (
					<div className={styles.checkMessage}>{checkMessage}</div>
				)}
			</section>
			<section className={styles.section}>
				<form onSubmit={handleSubmit(sendFormData)}>
					<h1 className={styles.divLabelForm}>Введите Ваши данные</h1>
					<input
						name="email"
						type="email"
						placeholder="Почта"
						{...register('email')}
					/>
					<input
						name="password"
						type="password"
						placeholder="Пароль"
						{...register('password')}
					/>
					<input
						name="repeatPassword"
						type="password"
						placeholder="Повторите пароль"
						{...register('repeatPassword')}
					/>
					<button
						name="subButton"
						className={styles.subButton}
						type="submit"
						disabled={
							!!alertMessageEmail ||
							!!alertMessagePassword ||
							!!alertMessageRepeatPassword
						}
					>
						Зарегистрироваться
					</button>
				</form>
			</section>
		</div>
	);
};

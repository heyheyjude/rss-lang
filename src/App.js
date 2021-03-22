import React from "react"
import NavigationBar from "./components/Navigation/NavigationBar"
import AuthBlock from "./components/Navigation/AuthBlock"
import AuthForm from "./components/AuthForm/AuthForm"
import MainPage from "./pages/MainPage"
import Button from "./components/Buttons/Button"
import classesCss from "./styles/App.module.scss"

function App() {

	const navigationClasses = [classesCss.Navigation, classesCss.NavigationCloud]


	return (
		<div>
			<NavigationBar className={navigationClasses.join(' ')}>
				<AuthBlock
					className={classesCss.AuthBlock}
					classes={{
						authButton: classesCss.BubbleButton,
						authButtonActive: classesCss.Active,
						loginButton: classesCss.LoginButton,
						modal: classesCss.AuthModal,
						modalActive: classesCss.Active
					}}
					styles={{
						authButton: {
							backgroundImage: `url(${process.env.PUBLIC_URL}/static/register2.jpg)`,
						}
					}
					}
				>
					<AuthForm />
				</AuthBlock>
				<Button
					label={"Учебник"}
					style={{backgroundImage: `url(${process.env.PUBLIC_URL}/static/book.webp)`}}
					className={[classesCss.BubbleButton, classesCss.BookButton].join(' ')}
				/>
				<Button
					label={"Саванна"}
					style={{backgroundImage: `url(${process.env.PUBLIC_URL}/static/savannah.jpg)`}}
					className={[classesCss.BubbleButton, classesCss.GameButton, classesCss.Savannah].join(' ')}
				/>
				<Button
					label={"Аудио-вызов"}
					style={{backgroundImage: `url(${process.env.PUBLIC_URL}/static/audio.jpg)`}}
					className={[classesCss.BubbleButton, classesCss.GameButton, classesCss.Audio].join(' ')}
				/>
				<Button
					label={"Спринт"}
					style={{backgroundImage: `url(${process.env.PUBLIC_URL}/static/sprint.jpg)`}}
					className={[classesCss.BubbleButton, classesCss.GameButton, classesCss.Sprint].join(' ')}
				/>
				<Button
					label={"Игра"}
					style={{backgroundImage: `url(${process.env.PUBLIC_URL}/static/book.webp)`}}
					className={[classesCss.BubbleButton, classesCss.GameButton, classesCss.Game].join(' ')}
				/>
			</NavigationBar>
			<MainPage>

			</MainPage>
		</div>
	)
}

export default App
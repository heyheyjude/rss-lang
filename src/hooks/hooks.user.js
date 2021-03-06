import { useDispatch, useSelector } from "react-redux"
import { useCallback, useState, useEffect } from "react"
import { addUserWord, updateExistingUserWord } from "../redux/actions.user"
import {
	getUserWordsGroup as getUserWordsGroupHelper,
	getUserWordsChunk as getUserWordsChunkHelper } from "../helpers/utils.words"
import {useWords, useWordsGroup} from "./hooks.words"



//Usage
// const { update, updatedWord, onError } = useUserWordUpdate()
// update(word, data)
// word - word from book
// data = {
//  difficulty: weak | normal | hard,
//	successCounter: Number,
//	failCounter: Number,
//  succeed: boolean
// }
//

export function useUserWordUpdate(){
	const user = useSelector(store => store.user)
	const dispatch = useDispatch()
	const [updatedWord, setUpdatedWord] = useState(null)
	const [onError, setOnError] = useState(null)

	const update = useCallback(async (word, data = {}) => {

    const {difficulty, succeed, failed, ...optional} = data

    if(typeof succeed === "boolean"){
      optional.successCounter = Number(succeed)
      optional.failCounter = Number(!succeed)
    }

		if (user.words[word.group] && user.words[word.group][word.page]) {
			const currentWord = user.words[word.group][word.page].find(userWord => userWord.wordId === word.id)
			if (currentWord) {
        if(currentWord.optional?.successCounter && optional.successCounter >= 0){
          optional.successCounter = currentWord.optional.successCounter + optional.successCounter
        }
        if(currentWord.optional?.failCounter  && optional.failCounter >= 0){
          optional.failCounter = currentWord.optional.failCounter + optional.failCounter
        }

				const wordForUpdate = {
					...currentWord,
					difficulty: difficulty || currentWord.difficulty || "normal",
					optional: {
						...currentWord.optional,
						...optional,
					},
				}
				return dispatch(updateExistingUserWord(wordForUpdate)).then( updatedWord => {
					setUpdatedWord(updatedWord)
          return updatedWord
				}).catch(e => {
					setOnError({word: wordForUpdate, e})
					return wordForUpdate
				})
			}
		}

		return dispatch(addUserWord(word, {difficulty: difficulty || "normal", optional})).then((word) => {
			setUpdatedWord(word)
      return word
		}).catch(e => setOnError({word, e}))
	}, [user, dispatch, updatedWord])
	return { update, updatedWord, onError }
}


//Usage
//const {currentUserWords, getUserWordsChunk, onLoading} = useUserWords()

export function useUserWords(){
	const user = useSelector(store => store.user)
	const words = useSelector(store => store.words)

	const {getWordsChunk} = useWords()
	const [onLoading, setOnLoading] = useState(false)
	const [currentUserWords, setCurrentUserWords] = useState(null)
 	const [subscription, setSubscription] = useState(null)

	const getUserWordsChunk = useCallback((group, page, filters = {}) => {
	  if(user?.isLogged){
      if(user.words[group] && user.words[group][page]){
        if(words && words[group] && words[group][page]){
          const chunk = getUserWordsChunkHelper(words[group][page], user.words[group][page], filters)
          setCurrentUserWords(chunk)
          return chunk
        } else {
          setOnLoading(true)
          return getWordsChunk(group, page).then((resWords) => {
            setCurrentUserWords(
              getUserWordsChunkHelper(resWords, user.words[group][page], filters)
            )
            return resWords
          })
        }
      } else {
        setSubscription({group, page, filters})
        return false
      }
    } else {
	    console.log("User is not logged in")
    }
	}, [user.words, words, getWordsChunk, user.isLogged])

	useEffect(() => {
    if(subscription && user.words[subscription.group] && user.words[subscription.group][subscription.page]){
      const {group, page, filters} = subscription
      getUserWordsChunk(group, page, filters)
      setSubscription(null)
    }
	}, [user.words, subscription, getUserWordsChunk])

	useEffect(() => {
		if(onLoading && currentUserWords){
			setOnLoading(false)
		}
	}, [currentUserWords, onLoading])

return {currentUserWords, getUserWordsChunk, onLoading}
}

//Usage
//const {getUserWordsGroup, onLoading, currentUserWordsGroup} = useUserWordsGroup()
export function useUserWordsGroup(){
	const user = useSelector(store => store.user)
	const words = useSelector(store => store.words)
	const {getWordsGroup} = useWordsGroup()
	const [currentUserWordsGroup, setCurrentUserWordsGroup] = useState(null)
	const [onLoading, setOnLoading] = useState(false)
	const [subscription, setSubscription] = useState(null)


	const getUserWordsGroup = useCallback((group, filters) => {
		if(user.words[group]){
			if(words && words[group]){
				const userGroup = getUserWordsGroupHelper(words[group], user.words[group], filters)
				setCurrentUserWordsGroup(userGroup)
				return userGroup
			} else {
				setOnLoading(true)
				return getWordsGroup(group).then((resGroup) => {
					setCurrentUserWordsGroup(
						getUserWordsGroupHelper(resGroup, user.words[group], filters)
					)
          return resGroup
				})
			}
		} else {
			setSubscription({group, filters})
			return false
		}
	}, [getWordsGroup, user.words, words])

	useEffect(() => {
		if(subscription && user.words[subscription.group]){
		  const {group, filters} = subscription
      setSubscription(null)
      getUserWordsGroup(group, filters)
		}
	}, [user.words, subscription])

	useEffect(() => {
		if(onLoading && currentUserWordsGroup){
			setOnLoading(false)
		}
	}, [currentUserWordsGroup, onLoading])

	return {getUserWordsGroup, onLoading, currentUserWordsGroup}
}
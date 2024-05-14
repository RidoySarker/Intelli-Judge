import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Shared/Header';
import Offcanvas from '../../Shared/Offcanvas';
import http from '../../interceptors/http';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API } from '../../constants/app';
import PageBannerStart from '../Course/PageBannerStart';
import '../../css/style.css';
import '../../css/responsive.css';
import '../../css/animation.css';
import '../../css/result_style.css';
export default function QuizQuestion() {
	const { quiz_id } = useParams();
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState({});
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [totalQuestion, setTotalQuestion] = useState(0);
	const [quizInfo, setQuizInfo] = useState({});
	const [resultModal, setResultModal] = useState(false);
	const [result, setResult] = useState({});
	const fetchSearchQuestion = async () => {
		try {
			const {
				data: { data }
			} = await http.get(`/frontend/fetch-quiz-question/${quiz_id}`);

			if (data) {
				setQuestions(data.questions);
				setCurrentQuestion(data.questions[0]);
				quizForm.setFieldValue('question_id', data.questions[0].question_id);
				quizForm.setFieldValue('question', data.questions[0].question);
				quizForm.setFieldValue('choices', data.questions[0].choices);
				quizForm.setFieldValue('is_multi', data.questions[0].is_multi);
				setTotalQuestion(data.questions.length);
				setQuizInfo(data.quiz);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const userEmail = localStorage.getItem('userEmail');
	const quizForm = useFormik({
		initialValues: {
			question_id: '',
			question: '',
			choices: {},
			choice_answer: '',
			is_multi: ''
		},
		validationSchema: Yup.object({
			choice_answer: Yup.mixed().required('Required')
		}),
		onSubmit: (values, { resetForm }) => {
			const data = {
				email: userEmail,
				quiz_id: quizInfo.id,
				question_id: values.question_id,
				choice_answer: values.choice_answer
			};

			axios
				.post(`${API}/quiz-submission`, data)
				.then(res => {
					resetForm();

					if (totalQuestion === currentQuestionNumber) {
						fetchResult();
						return false;
					}

					nextQuestion();
				})
				.catch(err => {
					console.log('H', err);
				});
		}
	});

	const isChecked = key => {
		if (Array.isArray(quizForm.values.choice_answer)) {
			return quizForm.values.choice_answer.includes(key);
		}
		return quizForm.values.choice_answer === key;
	};

	const nextQuestion = () => {
		let question = questions[currentQuestionIndex + 1];
		console.log({ question });
		setCurrentQuestionIndex(currentQuestionIndex + 1);
		setCurrentQuestionNumber(currentQuestionNumber + 1);
		setCurrentQuestion(questions[currentQuestionIndex + 1]);
		quizForm.setFieldValue('question_id', question.question_id);
		quizForm.setFieldValue('question', question.question);
		quizForm.setFieldValue('choices', question.choices);
		quizForm.setFieldValue('is_multi', question.is_multi);
	};

	const fetchResult = () => {
		axios
			.get(`${API}/quiz-result`, {
				params: {
					email: userEmail,
					quiz_id: quizInfo.id
				}
			})
			.then(res => {
				setResult(res.data.data);
				setResultModal(true);
			})
			.catch(err => {
				console.log('H', err);
			});
	};

	useEffect(() => {
		fetchSearchQuestion();
	}, []);

	return (
		<>
			<Header />
			<Offcanvas />
			<PageBannerStart name='Quiz' title={quizInfo.QuizTitle} />
			<div className='section section-padding'>
				<div className='container'>
					<div className='step-number pull-right'>
						<div className='step-number-inner'>
							Question <span id='activeStep'>{currentQuestionNumber}</span>/
							{totalQuestion}
						</div>
					</div>
					<main>
						{resultModal ? (
							<>
								<div className='result_page result_page_show'>
									<div className='result_inner'>
										<div className='result_inner2'>
											<h2>Quiz Result</h2>
											<div className='u_result'>
												<div className='u_score'>Your Score:</div>
												<span>{result.totalObtainedMarks} Points</span>
											</div>

											<div className='line' />
											<div className='result_show'>
												<a href='/'>
													<h2>Go To Home </h2>
												</a>
											</div>
										</div>
										<img
											className='behind_bg'
											src='/assets/images/bh-clip.png'
											alt='rectangle'
										/>
									</div>
								</div>
							</>
						) : (
							<>
								<div className='container'>
									<div className='row'>
										<div className='tab-100 order-c col-md-5 p-relative'>
											<div className='side-img'>
												<img src='/assets/images/side.png' alt='side-img' />
											</div>
										</div>
										<div className='tab-100 col-md-7'>
											<div className='show-section wrapper'>
												<section className='steps' style={{}}>
													<form
														className='needs-validation'
														noValidate
														onSubmit={quizForm.handleSubmit}>
														<h2 className='q-heading' dangerouslySetInnerHTML={{ __html: currentQuestion?.question}}>
														</h2>
														<div className='form-inner'>
															{Object.keys(
																currentQuestion?.choices ?? {}
															).map((key, index) => {
																return (
																	<div className='bounce-left radio-field'>
																		<input
																			className='checkmark'
																			type={
																				!!currentQuestion.is_multi
																					? 'checkbox'
																					: 'radio'
																			}
																			id='choice_answer'
																			name='choice_answer'
																			onChange={
																				quizForm.handleChange
																			}
																			onBlur={
																				quizForm.handleBlur
																			}
																			checked={isChecked(key)}
																			value={key}
																		/>
																		<label>
																			{
																				currentQuestion
																					?.choices[key]
																			}
																		</label>
																	</div>
																);
															})}
															<div className='text-danger'>
																{quizForm.touched.choice_answer &&
																	quizForm.errors
																		.choice_answer && (
																		<div>
																			{
																				quizForm.errors
																					.choice_answer
																			}
																		</div>
																	)}
															</div>
														</div>
														<div className='next-prev'>
															{totalQuestion ===
															currentQuestionNumber ? (
																<>
																	<button
																		type='submit'
																		className='apply'
																		id='sub'>
																		Submit
																		<i className='fa-solid fa-arrow-right'></i>
																	</button>
																</>
															) : (
																<>
																	<button
																		type='submit'
																		className='next'
																		id='step1btn'>
																		next question
																		<i className='fa-solid fa-arrow-right' />
																	</button>
																</>
															)}
														</div>
													</form>
												</section>
												<div className='question overflow-hidden'>
													<img
														src='/assets/images/question-sign.png'
														alt='question'
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
					</main>
				</div>
			</div>
		</>
	);
}

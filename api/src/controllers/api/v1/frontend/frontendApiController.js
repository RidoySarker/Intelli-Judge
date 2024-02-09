import prisma from '../../../../services/prisma/prisma';
import { error, success } from '../../../../helpers/apiResponse';
import { HTTP_INTERNAL_SERVER_ERROR, HTTP_OK } from '../../../../constants/statusCode';
import logger from '../../../../services/logger/loggerService';
import { re } from '@babel/core/lib/vendor/import-meta-resolve';

const fetchCourse = async (request, response) => {
	try {
		const course = await prisma.course.findMany({
			include: {
				courseCategory: true,
				instructor: true
			}
		});
		return response.status(HTTP_OK).send(course, 'Course Fetch Successfully', HTTP_OK);
	} catch (exception) {
		logger.error(`course content fetching : ${exception.message} `);
		return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
	}
};

const fetchCourseCategory = async (request, response) => {
	try {
		const courseCategory = await prisma.courseCategory.findMany({
			include: {
				Course: true
			}
		});
		return response
			.status(HTTP_OK)
			.send(courseCategory, 'Course Category Fetch Successfully', HTTP_OK);
	} catch (exception) {
		logger.error(`course category content fetching : ${exception.message} `);
		return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
	}
};

const fetchCategoryWiseCourse = async (request, response) => {
	try {
		const id = request.params.id;
		const course = await prisma.courseCategory.findMany({
			where: {
				id: parseInt(id)
			},
			include: {
				Course: true
			}
		});
		return response.status(HTTP_OK).send(course, 'Course Fetch Successfully', HTTP_OK);
	} catch (exception) {
		logger.error(`course fetching : ${exception.message} `);
		return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
	}
};

const fetchCourseDetails = async (request, response) => {
	try {
		const id = parseInt(request.params.id) || 0;
		const courseDetail = await prisma.course.findUnique({
			where: {
				id: id
			},
			include: {
				courseLearn: true,
				instructor: true
			}
		});
		const totalLectureCount = await prisma.courseContent.count({
			where: {
				courseId: id
			}
		});
		const relatedCourse = await prisma.course.findMany({
			take: 2,
			where: {
				categoryId: courseDetail.categoryId
			},
			orderBy: {
				id: 'desc'
			}
		});
		return response
			.status(HTTP_OK)
			.send(
				success(
					[courseDetail, totalLectureCount, relatedCourse],
					'course fetched successfully',
					HTTP_OK
				)
			);
	} catch (exception) {
		logger.error(`course fetching : ${exception.message} `);
		return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
	}
};

const fetchCourseContent = async (request, response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const courseDetail = await prisma.courseContentCategory.findMany({
            where: {
                courseId: id
            },
            include: {
                courseContent: {
                    include: {
                        CourseProgress: true
                    }
                },
            }
        });
        return response.status(HTTP_OK).send(success(courseDetail, 'course content fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`course fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const fetchReadingContent = async (request, response) => {
	try {
		const courseId = parseInt(request.params.course_id) || 0;
		const contentId = parseInt(request.params.id) || 0;
		const courseDetail = await prisma.courseContent.findUnique({
			where: {
				id: contentId
			}
		});
		const isNext = await prisma.courseContent.findUnique({
			where:{
				id: contentId + 1
			}
		});
		const isPrevious = await prisma.courseContent.findUnique({
			where: {
				id: contentId - 1
			}
		})
		return response
			.status(HTTP_OK)
			.send(success([courseDetail,isNext,isPrevious], 'content reading fetched successfully', HTTP_OK));
	} catch (exception) {
		logger.error(`content fetching : ${exception.message} `);
		return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
	}
};

const fetchQuizTopic = async (request, response) => {
	try {
		const quiz = await prisma.quiz.findMany();
		const format = quiz.map(item => {
			return {
				value: item.id,
				label: item.QuizTitle
			};
		});
		return response.status(HTTP_OK).send(success(format, 'quiz fetched successfully', HTTP_OK));
	} catch (exception) {
		logger.error(`quiz fetching : ${exception.message} `);
		return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
	}
};

const searchQuizQuestion = async (request, response) => {
	try {
		const quizIds = request.params;
		const quizQuestion = await prisma.quizQuestion.findMany({
			where: {
				quizId: {
					in: quizIds.id
				}
			},
			include: {
				quiz: true,
				courseQuestion: true
			}
		});
		const questionFormat = quizQuestion.map(question => {
			return {
				question: question.courseQuestion.question,
				choices: {
					choice_one: question.courseQuestion.choiceOne,
					choice_two: question.courseQuestion.choiceTwo,
					choice_three: question.courseQuestion.choiceThree,
					choice_four: question.courseQuestion.choiceFour
				},
				correct_choice: question.courseQuestion.correntChoice
			};
		});
		return response
			.status(HTTP_OK)
			.send(success(questionFormat, 'Quiz Question fetched successfully', HTTP_OK));
	} catch (exception) {
		logger.error(`quiz question fetching : ${exception.message} `);
		return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
	}
};

const quizQuestions = async (request, response) => {
	try {
		const quizId = request.params.id;
		const quizQuestion = await prisma.quizQuestion.findMany({
			where: {
				quizId: parseInt(quizId)
			},
			include: {
				quiz: true,
				courseQuestion: true
			}
		});
		const quiz = await prisma.quiz.findUnique({
			where: {
				id: parseInt(quizId)
			}
		});
		// logger.info(JSON.stringify(quiz))
		const questionFormat = quizQuestion.map(question => {
			return {
				question_id: question.questionsId,
				question: question.courseQuestion.question,
				choices: {
					choice_one: question.courseQuestion.choiceOne,
					choice_two: question.courseQuestion.choiceTwo,
					choice_three: question.courseQuestion.choiceThree,
					choice_four: question.courseQuestion.choiceFour
				},
				choice_answer: '',
				is_multi: parseInt(question.courseQuestion.isMulti)
			};
		});
		const data = {
			questions: questionFormat,
			quiz: quiz
		};
		return response
			.status(HTTP_OK)
			.send(success(data, 'Quiz Question fetched successfully', HTTP_OK));
	} catch (exception) {
		logger.error(`quiz question fetching : ${exception.message} `);
		return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
	}
};

const fetchTotalCourse = async (request, response) => {
	try {
		const totalCourse = await prisma.course.count();
		return response
			.status(HTTP_OK)
			.send(success(totalCourse, 'total course fetched successfully', HTTP_OK));
	} catch (error) {
		console.log(error);
	}
};

const checkUserSubscribedCourse = async (request, response) => {
	try {
		const email = request.params.email;
		const courseId = request.params.id;
		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		});
		const courseSubscribed = await prisma.subscribedCourse.findFirst({
			where: {
				userId: user.id,
				courseId: parseInt(courseId)
			}
		});
		return response
			.status(HTTP_OK)
			.send(success(courseSubscribed, 'Course Subscribed fetched successfully', HTTP_OK));
	} catch (exception) {
		logger.error(`content fetching : ${exception.message} `);
		return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
	}
};

const fetchProblems = async (request, response) => {
	let problems = await prisma.codingChallenge.findMany();
	return response
		.status(HTTP_OK)
		.send(success(problems, 'problems fetched successfully', HTTP_OK));
};

const fetchSubmissions = async (request, response) => {
    const email = request.params.email;
    const user = await prisma.user.findUnique({
        where: {
            'email': email
        }
    });
    let submissions = await prisma.submission.findMany({
        where: {
            userId: parseInt(user.id)
        },
        include: {
            question: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    level: true,
                    question_type: true,
                    problem_statement: true,
                }
            },
        }
    })
    return response.status(HTTP_OK).send(success(submissions, 'submissions fetched successfully', HTTP_OK));
}

const fetchSingleProblem = async (request, response) => {
	let problem = await prisma.codingChallenge.findFirst({
		where: {
			slug: request.params.question_id
		}
	});

	delete problem.solution;
	delete problem.solution_tester;
	delete problem.testcase;

	return response
		.status(HTTP_OK)
		.send(success(problem, 'problems fetched successfully', HTTP_OK));
};

const fetchSliders = async (request, response) => {
	const sliders = await prisma.slider.findMany();
	return response.status(HTTP_OK).send(success(sliders, 'Slider fetched successfully', HTTP_OK));
};

const fetchLatestCourse = async (request, response) => {
	const latestCourse = await prisma.course.findMany({
		include: {
			instructor: true
		},
		orderBy: {
			id: 'desc'
		},
		take: 3
	});
	return response.status(HTTP_OK).send(success(latestCourse, 'fetched successfully', HTTP_OK));
};

const fetchMultipleCategoryCourse = async (request, response) => {
	try {
		const Id = request.query.search.split(',').map(v => parseInt(v));
		const course = await prisma.course.findMany({
			where: {
				categoryId: { in: Id ?? [] }
			},
			include: {
				courseCategory: true,
				instructor: true
			}
		});
		return response.status(HTTP_OK).send(success(course, 'fetched successfully', HTTP_OK));
	} catch (error) {}
};

const areEqual = (arr1, arr2) => arr1.sort().join(',') === arr2.sort().join(',');

const submitQuiz = async (request, response) => {
	try {
		const { email, quiz_id, question_id, choice_answer } = request.body;

		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		});

		const question = await prisma.courseQuestion.findUnique({
			where: {
				id: parseInt(question_id)
			}
		});

		let isCorrect = false;
		let correctChoice = question.correntChoice;

		if (question.isMulti == 1) {
			const correctValues = correctChoice.map(v => {
				return v.value;
			});
			if (areEqual(correctValues, choice_answer)) {
				isCorrect = true;
			}
		} else {
			if (correctChoice.value == choice_answer) {
				isCorrect = true;
			}
		}

		const participatorProgress = await prisma.participatorProgress.create({
			data: {
				quiz: {
					connect: { id: parseInt(quiz_id) }
				},
				user: {
					connect: { id: parseInt(user.id) }
				},
				courseQuestion: {
					connect: { id: parseInt(question.id) }
				},
				isCorrect: isCorrect
			}
		});

		let quizParticipators = await prisma.quizParticipator.findFirst({
			where: {
				quizId: parseInt(quiz_id),
				userId: parseInt(user.id)
			}
		});
		if (!quizParticipators) {
			quizParticipators = await prisma.quizParticipator.create({
				data: {
					quizId: parseInt(quiz_id),
					userId: parseInt(user.id),
					totalObtainedMarks: 0
				}
			});
		}

		let marks = parseInt(quizParticipators?.totalObtainedMarks || 0);
		if (isCorrect) {
			marks += 5;
		}

		await prisma.quizParticipator.update({
			where: {
				id: parseInt(quizParticipators.id)
			},
			data: {
				totalObtainedMarks: marks
			}
		});
		return response.status(HTTP_OK).send(success([], 'fetched successfully', HTTP_OK));
	} catch (error) {
		logger.error(`quiz deleting : ${error.message} `);
		return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(error.message));
	}
};

const submitResult = async (request, response) => {
	try {
		const { email, quiz_id } = request.query;
		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		});

		let result = await prisma.quizParticipator.findFirst({
			where: {
				quizId: parseInt(quiz_id),
				userId: parseInt(user.id)
			}
		});

		return response.status(HTTP_OK).send(success(result, 'fetched successfully', HTTP_OK));
	} catch (error) {
		logger.error(`quiz result : ${error.message} `);
		return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(error.message));
	}
};

const fetchReferralUser = async (request, response) => {
	const email = request.params.email;
	const user = await prisma.user.findUnique({
		where: {
			'email': email
		}
	});
	const referralUsers = await prisma.referralToken.findMany({
		where:{
			token: user.referralCode
		},
		include: {
			user: true,
		}
	});
	return response.status(HTTP_OK).send(success(referralUsers, 'fetched successfully', HTTP_OK));
}

export {
	fetchCourse,
	fetchCourseDetails,
	fetchCourseContent,
	fetchReadingContent,
	fetchQuizTopic,
	searchQuizQuestion,
	fetchCourseCategory,
	fetchCategoryWiseCourse,
	fetchTotalCourse,
	checkUserSubscribedCourse,
	fetchProblems,
	fetchSubmissions,
	fetchSingleProblem,
	quizQuestions,
	fetchSliders,
	fetchLatestCourse,
	fetchMultipleCategoryCourse,
	submitQuiz,
	submitResult,
	fetchReferralUser
};

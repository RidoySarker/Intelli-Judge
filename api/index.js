import application from "./application";


application.listen(process.env.PORT || 8000, () => {
    console.log(`Application Running On ${process.env.PORT}`)
})


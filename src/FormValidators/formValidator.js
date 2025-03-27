import passwordValidator from "password-validator"
var schema = new passwordValidator();
// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                             // Must have at least 1 uppercase letters
    .has().lowercase(1)                             // Must have at least 1 lowercase letters
    .has().digits(1)                                // Must have at least 1 digit
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Admin@123', 'Password@123']); // Blacklist these values

export default function formValidator(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
        case "username":
        case "color":
        case "subject":
            if (!value || value.length === 0)
                return name + "Field is Mendatory"
            else if (value.length < 3 || value.length > 50)
                return name + "Field Length Must Be 3-50 Characters"
            else
                return ""

        case "email":
            if (!value || value.length === 0)
                return name + "Field is Mendatory"
            else if (value.length < 13 || value.length > 50)
                return name + "Field Length Must Be 13-50 Characters"
            else
                return ""

        case "password":
            if (!value || value.length === 0)
                return "Password Field is Mendatory"
            else if (!schema.validate(value))
                return "Invalid Password, It Must Contains 8-100 Charcters, At Least 1 Upper Case Character, 1 Lower Case Character, 1 Digit and Doesn't Invlude any Space"
            else
                return ""

        case "phone":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (value.length < 10 || value.length > 10)
                return name + "Field Length Must Be 10 Characters"
            else if (!(value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9")))
                return name + "Invalid Phone Number, It Must Start With 6,7,8,9"
            else
                return ""

        case "size":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (value.length > 10)
                return name + "Field Length Must Be 10 Characters"
            else
                return ""

        case "bacePrice":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (value < 1)
                return "Base Price Must Be More Than 0"
            else
                return ""

        case "discount":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (value < 0 || value > 100)
                return "Discount Must Be 0-100"
            else
                return ""
        case "stockQuantity":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (value < 0)
                return "Stock Quantity Must Not Be Nagative"
            else
                return ""

        case "message":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (value.length < 50)
                return name + " Message Field Length Must Be 50 More Than Characters"
            else
                return ""
        default:
            return ""
    }
}

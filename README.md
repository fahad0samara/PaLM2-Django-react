

## Chat Application

This project is a chat application built with React and Django. It allows users to start conversations and interact with an AI model using text prompts. The application supports storing conversation history and has a responsive design with a sidebar for easy navigation.

![Screenshot 2024-08-11 092646](https://github.com/user-attachments/assets/bd6760b1-c29d-4715-83a3-da55346ddb55)



### Features

- **Start New Conversations:** Initiate new chat sessions and interact with the AI model.
- **View Conversation History:** Access past conversations and view prompts and responses.
- **Delete Conversations:** Remove individual conversations or clear the entire history.
- **Responsive Design:** Mobile-friendly interface with a collapsible sidebar.

### Technologies Used

- **Frontend:** React, React Icons
- **Backend:** Django, Django REST Framework
- **AI Integration:** Google Generative AI (Gemini)
- **Styling:** Custom CSS

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/fahad0samara/PaLM2-Django-react.git
   cd chat-application
   ```

2. **Backend Setup:**

   - Navigate to the `backend` directory.
   - Create a virtual environment and activate it:

     ```bash
     python -m venv env
     source env/bin/activate  # On Windows use `env\Scripts\activate`
     ```

   - Install dependencies:

     ```bash
     pip install -r requirements.txt
     ```

   - Apply migrations:

     ```bash
     python manage.py migrate
     ```

   - Start the Django server:

     ```bash
     python manage.py runserver
     ```

3. **Frontend Setup:**

   - Navigate to the `frontend` directory.

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the React development server:

     ```bash
     npm start
     ```

4. **API Configuration:**

   - Ensure that the backend API is accessible at `http://127.0.0.1:8000/api/`.
   - Update API URLs in the React application if needed.

### Usage

- Open your browser and navigate to `http://localhost:3000` to use the chat application.
- Interact with the AI by typing your messages and viewing the responses in the chat window.
- Use the sidebar to manage conversations and access chat history.

### Contributing

Feel free to open issues or submit pull requests if you have any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.




document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_STATE_KEY = "discursive-activity";

  const textarea = document.getElementById("discursive-textarea");
  const submitBtn = document.getElementById("discursive-submit");
  const editBtn = document.getElementById("discursive-edit");
  const feedback = document.getElementById("discursive-answer-feedback");
  const closeBtn = feedback.querySelector(".answer-feedback-close");

  const updateSubmitButton = () => {
    const hasContent = textarea.value.trim();
    const wasAnswered = !editBtn.disabled;

    submitBtn.disabled = !hasContent || wasAnswered;
  };

  const saveState = () => {
    const state = {
      answer: textarea.value,
      feedbackVisible: feedback.style.display !== "none",
      submitDisabled: submitBtn.disabled,
      editDisabled: editBtn.disabled,
      textareaDisabled: textarea.disabled,
    };
    sessionStorage.setItem(STORAGE_STATE_KEY, JSON.stringify(state));
  };

  const restoreState = () => {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_STATE_KEY));

    if (saved) {
      textarea.value = saved.answer || "";
      feedback.style.display = saved.feedbackVisible ? "flex" : "none";
      submitBtn.disabled = saved.submitDisabled;
      editBtn.disabled = saved.editDisabled;
      textarea.disabled = saved.textareaDisabled || false;
    }
  };

  restoreState();
  updateSubmitButton();

  textarea.addEventListener("input", () => {
    updateSubmitButton();
    saveState();
  });

  submitBtn.addEventListener("click", () => {
    if (textarea.value.trim()) {
      textarea.disabled = true;
      feedback.style.display = "flex";
      submitBtn.disabled = true;
      editBtn.disabled = false;
      saveState();
    }
  });

  editBtn.addEventListener("click", () => {
    textarea.disabled = false;
    submitBtn.disabled = false;
    editBtn.disabled = true;
    feedback.style.display = "none";
    saveState();
  });

  closeBtn.addEventListener("click", () => {
    feedback.style.display = "none";
    saveState();
  });
});

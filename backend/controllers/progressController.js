import Progress from "../src/models/Progress.js";
import User from "../src/models/User.js";
import Tasks from "../src/models/Task.js";

// Mark task complete function
export const markTaskComplete = async (req, res) => {
  try {
    // check if user is logged in or not
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized, user not logged in" });
    }

    // fetch task id which is completed from request
    const { taskId } = req.body;
    if (!taskId) {
      return res
        .status(500)
        .json({ success: false, message: "Task Id not present" });
    }

    // mark task status as completed
    const completedTask = await Tasks.findOne({ _id: taskId, userId: userId });
    completedTask.status = "Completed";
    await completedTask.save();

    // fetch progress document of the user
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const progressDoc = await Progress.findOne({ userId: userId, date: today });

    // if progress document doesn't exist, create a new one
    if (!progressDoc) {
      const newProgress = new Progress({
        userId,
        date: today,
        completedTasks: [taskId],
      });
      await newProgress.save();
      return res
        .status(200)
        .json(
          { success: true, message: "Task marked as completed" },
          newProgress
        );
    }

    // if progress document exists, add the new id and update
    if (!progressDoc.completedTasks.includes(taskId)) {
      progressDoc.completedTasks.push(taskId);
      await progressDoc.save();
    }
    return res
      .status(200)
      .json({ success: true, message: "Task marked as completed" });
  } catch (error) {
    // error handling
    console.log("Error marking task complete", error);
    return res
      .status(500)
      .json({ success: false, message: "Error marking task complete" });
  }
};

// Get daily progress function
export const getDailyProgress = async (req, res) => {
  try {
    // check if user is logged in or not
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized, user not logged in" });
    }

    // fetching progress document from database
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dailyProgress = await Progress.findOne({
      userId: userId,
      date: today,
    });
    if (!dailyProgress) {
      return res.status(200).json({ success: true, data: [] });
    }
    return res
      .status(200)
      .json({ success: true, data: dailyProgress.completedTasks });
  } catch (error) {
    // error handling
    console.log("Error fetching daily progress", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching daily progress" });
  }
};

// Get weekly summary function
export const getWeeklySummary = async (req, res) => {
  try {
    // check if user is logged in or not
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized, user not logged in" });
    }

    // get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // get 7 day previous date
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 6);

    // access all progress docs from previous 7 days
    const progressDocs = await Progress.find({
      userId: userId,
      date: { $gte: startDate, $lte: today },
    });

    // make lookup map
    const map = {};
    progressDocs.forEach((doc) => {
      const dateKey = doc.date.toISOString().split("T")[0];
      map[dateKey] = doc.completedTasks.length;
    });

    // weekly summary(oldest -> newest)
    const summary = [];
    let total = 0;

    for (let i = 6; i >= 0; i--) {
      // get dates in descending order
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split("T")[0];

      // fetch number of tasks from lookup map or set to 0
      const taskCount = map[dateKey] || 0;
      total += taskCount;

      // add date and number of tasks into summary
      summary.push({ date: dateKey, completed: taskCount });
    }

    // streak calculation
    let streak = 0;
    for (let i = summary.length - 1; i >= 0; i--) {
      if (summary[i].completed > 0) {
        streak++;
      } else break;
    }

    return res.status(200).json({
      success: true,
      summary,
      streak,
      total,
    });
  } catch (error) {
    // error handling
    console.log("Error fetching weekly progress", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching weekly progress" });
  }
};

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const videoRef = useRef<any>(`https://i.gifer.com/ZKZg.gif`);
  const socketRef = useRef<WebSocket | null>(null);
  const [cameraState, setCameraState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Create a WebSocket connection
    const socket = new WebSocket("ws://localhost:8765/");

    if (cameraState) {
      setLoading(true);
      // Save the socket instance to the ref
      socketRef.current = socket;

      // Event listener for when the connection is established
      socket.addEventListener("open", (event) => {
        console.log("WebSocket connection opened:", event);
      });

      // Event listener for when a message is received
      socket.addEventListener("message", (event) => {
        const data = event.data;

        // Decode base64 and update the video source
        const videoData = `data:image/jpeg;base64,${data}`;
        videoRef.current.src = videoData;
        setLoading(false);
      });

      // Event listener for when the connection is closed
      socket.addEventListener("close", (event) => {
        console.log("WebSocket connection closed:", event);
      });
      videoRef.current.src = `https://i.gifer.com/ZKZg.gif`;
    } else {
      videoRef.current.src = `https://moviemaker.minitool.com/images/uploads/articles/2020/08/youtube-video-not-available/youtube-video-not-available-1.png`;
    }

    // Clean up the WebSocket connection on component unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [cameraState]);

  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/");
  }, [navigate]);

  return (
    <>
      <div className="container mt-4" style={{ textAlign: "center" }}>
        <button
          className="btn btn-dark mb-4"
          style={{ width: "600px" }}
          onClick={() => setCameraState(!cameraState)}
        >
          {cameraState ? "STOP CAMERA" : "START CAMERA"}
        </button>

        <div
          className="mx-auto"
          style={{
            height: "400px",
            width: "600px",
            borderRadius: 6,
          }}
        >
          <img
            ref={videoRef}
            alt="Webcam Feed"
            style={{
              width: loading ? "50px" : "600px",
              height: loading ? "50px" : "400px",
              marginTop: loading ? "190px" : "0px",
              borderRadius: 6,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

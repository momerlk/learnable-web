package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os/exec"
	"runtime"
	"strings"

	"github.com/rs/cors"
)

var ApplicationsWin map[string]string = map[string]string{
	"vscode":    "C:\\Users\\Farhat Ali\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe",
	"chrome":    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
	"spotify":   "C:\\Users\\orgam\\AppData\\Roaming\\Spotify\\Spotify.exe",
	"messenger": "C:\\Users\\orgam\\AppData\\Local\\Programs\\Messenger\\Messenger.exe",
	"discord":   "C:\\Users\\orgam\\AppData\\Local\\Discord\\app-1.0.9032\\Discord.exe",
	"tabby":     "C:\\Users\\orgam\\AppData\\Local\\Programs\\Tabby\\Tabby.exe",
	"evernote":  "C:\\Users\\orgam\\AppData\\Local\\Programs\\Evernote\\Evernote.exe",
	"scratch":   "C:\\Users\\Farhat Ali\\AppData\\Local\\Programs\\Scratch 3\\Scratch 3.exe",
	"books":     "--start-fullscreen --new-window https://www.bookbub.com/ebook-deals?categories=childrens",
	"youtube":   "--start-fullscreen --new-window https://www.youtubekids.com/?hl=en-GB",
}

type CommandRequest struct {
	Command string `json:"command"`
}

type ApplicationRequest struct {
	Application string `json:"application"`
}

func main() {

	// Define HTTP routes
	http.HandleFunc("/execute", executeCommand)
	http.HandleFunc("/open", openApplication)

	// Add CORS middleware
	mux := http.NewServeMux()
	mux.HandleFunc("/execute", executeCommand)
	mux.HandleFunc("/open", openApplication)
	handler := cors.AllowAll().Handler(mux)

	// Start HTTP server with CORS middleware
	port := ":8080"
	fmt.Printf("Server listening on port %s...\n", port)
	log.Fatal(http.ListenAndServe(port, handler))
}

func executeCommand(w http.ResponseWriter, r *http.Request) {
	// Parse JSON body
	var commandReq CommandRequest
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	if err := json.Unmarshal(body, &commandReq); err != nil {
		http.Error(w, "Failed to parse JSON body", http.StatusBadRequest)
		return
	}

	// Execute the command
	output, err := exec.Command(commandReq.Command).Output()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Write the command output to the response
	w.Header().Set("Content-Type", "text/plain")
	w.Write(output)
}

func openApplication(w http.ResponseWriter, r *http.Request) {
	// Parse JSON body
	var appReq ApplicationRequest
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	if err := json.Unmarshal(body, &appReq); err != nil {
		http.Error(w, "Failed to parse JSON body", http.StatusBadRequest)
		return
	}

	// Determine the appropriate command based on the operating system
	var cmd *exec.Cmd
	if runtime.GOOS == "windows" {
		var app string = ApplicationsWin[appReq.Application]
		if strings.Contains(app, "window") {
            args := strings.Split(app , " ")
            var chrome string = ApplicationsWin["chrome"]
            fmt.Printf("Opening %v with args : %v\n", chrome , args)
            cmd = exec.Command(chrome , args...)
            
            fmt.Println(cmd.Output())
		} else {

            fmt.Printf("Opening %v\n", app)
            cmd = exec.Command(app) // just directly open the executable
            fmt.Println(cmd.Output())
        }
	} else {
		// Use 'open' command on other operating systems
		cmd = exec.Command("open", "-a", appReq.Application)
	}

	// Execute the command
	err = cmd.Run()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Write success message to the response
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf("Application '%s' opened successfully\n", appReq.Application)))
}

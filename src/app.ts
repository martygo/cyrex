import fs from "fs";

const DIRECTORY = "dist";

let filesNames: string[] = [];

if (fs.existsSync(DIRECTORY)) {
	if (fs.readdirSync(DIRECTORY).length != 0) {
		try {
			const files = fs.readdirSync(DIRECTORY);

			files.forEach((file) => {
				if (file.includes(".html")) {
					file = file.split(".")[0];

					filesNames.push(file);
				}
			});

			filesNames.forEach((folder) => {
				fs.mkdirSync(`${DIRECTORY}/${folder}`);
			});
		} catch (error) {
			console.log("Error reading files", error);
		}
	}
} else {
	console.log("Folder 'dist' doesn't exist");
	process.exit(1);
}

declare var responsiveVoice;

export class Speech {
    static textToSpeechEnabled = false;

    static say(message: string) {
        if (Speech.textToSpeechEnabled) {
            responsiveVoice.speak(message, "French Female");
        }
    }
}
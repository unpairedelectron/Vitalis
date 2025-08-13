// Advanced Voice Synthesis for Health Oracle
// Provides natural, medical-grade text-to-speech with personality

export interface VoiceProfile {
  name: string;
  personality: 'clinical' | 'friendly' | 'coach' | 'researcher';
  pitch: number;
  rate: number;
  volume: number;
  language: string;
  accent: string;
  emotionalTone: 'neutral' | 'caring' | 'authoritative' | 'encouraging';
}

export class AdvancedVoiceSynthesis {
  private static synthesis: SpeechSynthesis | null = null;
  private static voices: SpeechSynthesisVoice[] = [];
  private static isSupported: boolean = false;

  static initialize(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
      this.isSupported = true;
      
      // Load available voices
      this.loadVoices();
      
      // Listen for voice changes
      this.synthesis.addEventListener('voiceschanged', () => {
        this.loadVoices();
      });
    }
  }

  private static loadVoices(): void {
    if (this.synthesis) {
      this.voices = this.synthesis.getVoices();
    }
  }

  static getVoiceProfiles(): VoiceProfile[] {
    return [
      {
        name: 'Dr. Sarah (Clinical)',
        personality: 'clinical',
        pitch: 0.9,
        rate: 0.9,
        volume: 0.8,
        language: 'en-US',
        accent: 'american',
        emotionalTone: 'authoritative'
      },
      {
        name: 'Alex (Friendly)',
        personality: 'friendly',
        pitch: 1.1,
        rate: 1.0,
        volume: 0.9,
        language: 'en-US',
        accent: 'american',
        emotionalTone: 'caring'
      },
      {
        name: 'Coach Mike (Motivational)',
        personality: 'coach',
        pitch: 1.0,
        rate: 1.1,
        volume: 1.0,
        language: 'en-US',
        accent: 'american',
        emotionalTone: 'encouraging'
      },
      {
        name: 'Prof. Chen (Research)',
        personality: 'researcher',
        pitch: 0.8,
        rate: 0.8,
        volume: 0.7,
        language: 'en-US',
        accent: 'neutral',
        emotionalTone: 'neutral'
      }
    ];
  }

  static async speak(
    text: string, 
    profile: VoiceProfile,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (error: any) => void
  ): Promise<void> {
    if (!this.isSupported || !this.synthesis) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Stop any current speech
    this.synthesis.cancel();

    // Process text for better speech
    const processedText = this.processTextForSpeech(text, profile.personality);

    const utterance = new SpeechSynthesisUtterance(processedText);
    
    // Configure utterance
    utterance.pitch = profile.pitch;
    utterance.rate = profile.rate;
    utterance.volume = profile.volume;
    utterance.lang = profile.language;

    // Select best voice
    const selectedVoice = this.selectBestVoice(profile);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Set event handlers
    utterance.onstart = () => {
      console.log('🎙️ Speech started');
      onStart?.();
    };

    utterance.onend = () => {
      console.log('🎙️ Speech ended');
      onEnd?.();
    };

    utterance.onerror = (event) => {
      console.error('🎙️ Speech error:', event);
      onError?.(event);
    };

    // Speak with enhanced timing
    setTimeout(() => {
      this.synthesis!.speak(utterance);
    }, 100);
  }

  static stop(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  static pause(): void {
    if (this.synthesis) {
      this.synthesis.pause();
    }
  }

  static resume(): void {
    if (this.synthesis) {
      this.synthesis.resume();
    }
  }

  static isPlaying(): boolean {
    return this.synthesis ? this.synthesis.speaking : false;
  }

  private static processTextForSpeech(text: string, personality: string): string {
    // Remove markdown formatting
    let processedText = text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
      .replace(/\*(.*?)\*/g, '$1')     // Italic
      .replace(/#{1,6}\s?(.*)/g, '$1') // Headers
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
      .replace(/`(.*?)`/g, '$1')       // Code
      .replace(/^\s*[-*+]\s+/gm, '')   // List items
      .replace(/^\s*\d+\.\s+/gm, '')   // Numbered lists
      .replace(/\n{2,}/g, '. ')        // Multiple newlines
      .replace(/\n/g, '. ')            // Single newlines
      .trim();

    // Add personality-specific modifications
    switch (personality) {
      case 'clinical':
        processedText = this.addClinicalPhrasing(processedText);
        break;
      case 'friendly':
        processedText = this.addFriendlyPhrasing(processedText);
        break;
      case 'coach':
        processedText = this.addCoachPhrasing(processedText);
        break;
      case 'researcher':
        processedText = this.addResearcherPhrasing(processedText);
        break;
    }

    // Add natural pauses
    processedText = processedText
      .replace(/\. /g, '. ... ')
      .replace(/: /g, ': .. ')
      .replace(/; /g, '; .. ')
      .replace(/! /g, '! ... ')
      .replace(/\? /g, '? ... ');

    return processedText;
  }

  private static addClinicalPhrasing(text: string): string {
    const prefix = "Based on clinical analysis, ";
    const suffix = " Please consult with your healthcare provider for personalized medical advice.";
    return prefix + text + suffix;
  }

  private static addFriendlyPhrasing(text: string): string {
    const prefix = "Hey there! Here's what I found: ";
    const suffix = " I'm here to help you on your health journey!";
    return prefix + text + suffix;
  }

  private static addCoachPhrasing(text: string): string {
    const prefix = "Alright, let's dive into this! ";
    const suffix = " You've got this! Stay consistent and trust the process.";
    return prefix + text + suffix;
  }

  private static addResearcherPhrasing(text: string): string {
    const prefix = "According to current research findings, ";
    const suffix = " These insights are based on peer-reviewed scientific literature.";
    return prefix + text + suffix;
  }

  private static selectBestVoice(profile: VoiceProfile): SpeechSynthesisVoice | null {
    if (this.voices.length === 0) return null;

    // Prefer voices that match the profile characteristics
    const filtered = this.voices.filter(voice => {
      const name = voice.name.toLowerCase();
      const lang = voice.lang.toLowerCase();
      
      // Match language
      if (!lang.includes(profile.language.split('-')[0])) return false;
      
      // Prefer certain voice characteristics based on personality
      switch (profile.personality) {
        case 'clinical':
          return name.includes('female') || name.includes('woman') || 
                 name.includes('doctor') || name.includes('professional');
        case 'friendly':
          return name.includes('natural') || name.includes('friendly') ||
                 name.includes('default');
        case 'coach':
          return name.includes('male') || name.includes('man') ||
                 name.includes('energetic') || name.includes('motivational');
        case 'researcher':
          return name.includes('scholarly') || name.includes('academic') ||
                 name.includes('professional');
        default:
          return true;
      }
    });

    // Return best match or fallback to first available
    return filtered.length > 0 ? filtered[0] : this.voices[0];
  }
}

// Auto-initialize when imported
if (typeof window !== 'undefined') {
  AdvancedVoiceSynthesis.initialize();
}
